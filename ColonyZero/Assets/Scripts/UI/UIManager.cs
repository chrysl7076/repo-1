using UnityEngine;
using TMPro;

public class UIManager : MonoBehaviour
{
    [Header("Resource Text Elements")]
    public TMP_Text mineralsText;
    public TMP_Text energyText;
    public TMP_Text oxygenText;
    public TMP_Text colonistsText;

    [Header("Prestige UI")]
    public TMP_Text prestigeText;
    public GameObject prestigeAvailableIndicator;

    [Header("Clicker Options")]
    public RectTransform planetClickArea;
    public GameObject floatingTextPrefab;

    private void Update()
    {
        if (GameManager.Instance == null) return;

        mineralsText.text = $"Minerals: {GameManager.Instance.Minerals:F1}";
        energyText.text = $"Energy: {GameManager.Instance.Energy:F1}";
        oxygenText.text = $"Oxygen: {GameManager.Instance.Oxygen:F1}";
        colonistsText.text = $"Population: {GameManager.Instance.Colonists:F0}";

        if (prestigeText != null)
        {
            int lvl = GameManager.Instance.PrestigeLevel;
            float mult = GameManager.Instance.ProductionMultiplier;
            prestigeText.text = lvl > 0
                ? $"New Colony+ {lvl}  |  x{mult:F1} Production"
                : "New Colony+ 0";
        }

        if (prestigeAvailableIndicator != null)
            prestigeAvailableIndicator.SetActive(GameManager.Instance.IsWinConditionMet());
    }

    public void OnPlanetClicked()
    {
        if (GameManager.Instance == null) return;

        float clickValue = (1 + (GameManager.Instance.Colonists * 0.5f)) * GameManager.Instance.ProductionMultiplier;
        GameManager.Instance.AddResources(clickValue, 0, 0);

        AudioManager.Instance?.PlayClickSound();

        if (floatingTextPrefab != null && planetClickArea != null)
        {
            GameObject floatingObj = Instantiate(floatingTextPrefab, planetClickArea);
            floatingObj.transform.position = Input.mousePosition;

            var textComp = floatingObj.GetComponent<TMP_Text>();
            if (textComp != null) textComp.text = $"+{clickValue:F0}";
        }
    }
}