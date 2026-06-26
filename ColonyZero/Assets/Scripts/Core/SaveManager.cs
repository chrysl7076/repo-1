using UnityEngine;

public class SaveManager : MonoBehaviour
{
    public static SaveManager Instance;

    void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    public void SaveGame(GameManager gm)
    {
        PlayerPrefs.SetFloat("Minerals", gm.Minerals);
        PlayerPrefs.SetFloat("Energy", gm.Energy);
        PlayerPrefs.SetFloat("Oxygen", gm.Oxygen);
        PlayerPrefs.SetFloat("Colonists", gm.Colonists);
        PlayerPrefs.SetInt("PrestigeLevel", gm.PrestigeLevel);
        PlayerPrefs.Save();
    }

    public void LoadGame(GameManager gm)
    {
        gm.Minerals = PlayerPrefs.GetFloat("Minerals", 100f);
        gm.Energy = PlayerPrefs.GetFloat("Energy", 50f);
        gm.Oxygen = PlayerPrefs.GetFloat("Oxygen", 50f);
        gm.Colonists = PlayerPrefs.GetFloat("Colonists", 0f);
        gm.PrestigeLevel = PlayerPrefs.GetInt("PrestigeLevel", 0);
    }
}