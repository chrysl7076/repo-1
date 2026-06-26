using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    [Header("Resources")]
    public float Minerals = 100f;
    public float Energy = 50f;
    public float Oxygen = 50f;
    public float Colonists = 0f;

    [Header("References")]
    public BuildingPanel buildingPanel;

    [Header("Win Condition")]
    public GameObject winPanel;
    private bool _hasWon = false;

    [Header("Progression")]
    public int currentPhase = 1;

    [Header("Prestige")]
    public int PrestigeLevel = 0;
    public GameObject prestigePanel;

    // +10% production per prestige level, stacking multiplicatively
    public float ProductionMultiplier => 1f + PrestigeLevel * 0.10f;

    private Dictionary<BuildingData, int> _owned = new();

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        SaveManager.Instance?.LoadGame(this);
        StartCoroutine(PassiveIncome());
    }

    public int GetOwned(BuildingData data)
        => _owned.TryGetValue(data, out int n) ? n : 0;

    public void RegisterPurchase(BuildingData data)
    {
        if (!_owned.ContainsKey(data)) _owned[data] = 0;
        _owned[data]++;
        buildingPanel?.RefreshAll();
    }

    public void AddResources(float m, float e, float o)
    {
        Minerals += m;
        Energy += e;
        Oxygen += o;

        Minerals = Mathf.Max(0, Minerals);
        Energy = Mathf.Max(0, Energy);
        Oxygen = Mathf.Max(0, Oxygen);
    }

    public bool SpendResources(float m, float e, float o)
    {
        if (Minerals >= m && Energy >= e && Oxygen >= o)
        {
            Minerals -= m;
            Energy -= e;
            Oxygen -= o;
            return true;
        }
        return false;
    }

    // Returns true when the player qualifies to prestige
    public bool IsWinConditionMet() => _owned.Count >= 6 && Colonists >= 5;

    // Resets buildings and minerals, increments prestige level
    public void Prestige()
    {
        PrestigeLevel++;
        Minerals = 100f;
        Energy = 50f;
        Oxygen = 50f;
        Colonists = 0f;
        _owned.Clear();
        _hasWon = false;
        prestigePanel?.SetActive(false);
        buildingPanel?.RefreshAll();
        SaveManager.Instance?.SaveGame(this);
    }

    private IEnumerator PassiveIncome()
    {
        while (true)
        {
            yield return new WaitForSeconds(1f);

            float mult = ProductionMultiplier;
            foreach (var kvp in _owned)
            {
                BuildingData d = kvp.Key;
                int n = kvp.Value;
                Minerals += d.mineralsPerTick * n * mult;
                Energy += d.energyPerTick * n * mult;
                Oxygen += d.oxygenPerTick * n * mult;
                Colonists += d.populationPerTick * n * mult;
                Energy -= d.energyDrain * n;
            }

            Minerals = Mathf.Max(0, Minerals);
            Energy = Mathf.Max(0, Energy);
            Oxygen = Mathf.Max(0, Oxygen);

            CheckWinCondition();
            buildingPanel?.RefreshAll();
        }
    }

    private void CheckWinCondition()
    {
        if (_hasWon) return;

        if (IsWinConditionMet())
        {
            _hasWon = true;
            prestigePanel?.SetActive(true);
        }
    }

    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}