using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PrestigePanel : MonoBehaviour
{
    [Header("UI")]
    public TMP_Text titleText;
    public TMP_Text descriptionText;
    public Button prestigeButton;
    public Button keepPlayingButton;

    void Start()
    {
        prestigeButton.onClick.AddListener(OnPrestige);
        keepPlayingButton.onClick.AddListener(OnKeepPlaying);
    }

    void OnEnable()
    {
        RefreshText();
    }

    void RefreshText()
    {
        if (GameManager.Instance == null) return;

        int nextLevel = GameManager.Instance.PrestigeLevel + 1;
        float nextMult = 1f + nextLevel * 0.10f;

        if (titleText != null)
            titleText.text = $"New Colony+ {nextLevel}";

        if (descriptionText != null)
            descriptionText.text =
                $"Your colony has met the win condition!\n\n" +
                $"Prestige to reset buildings and minerals\n" +
                $"in exchange for a permanent\n" +
                $"x{nextMult:F1} production multiplier.";
    }

    void OnPrestige()
    {
        GameManager.Instance?.Prestige();
    }

    void OnKeepPlaying()
    {
        gameObject.SetActive(false);
    }
}
