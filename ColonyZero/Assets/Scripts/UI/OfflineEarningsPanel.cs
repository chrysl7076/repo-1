using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class OfflineEarningsPanel : MonoBehaviour
{
    [Header("UI")]
    public TMP_Text titleText;
    public TMP_Text earningsText;
    public Button closeButton;

    void Start()
    {
        closeButton.onClick.AddListener(() => gameObject.SetActive(false));
    }

    public void Show(long seconds, float minerals, float energy, float oxygen, float colonists)
    {
        if (titleText != null)
            titleText.text = $"Welcome Back!\n{FormatTime(seconds)} away";

        var lines = new List<string>();
        if (minerals  > 0.1f) lines.Add($"+{minerals:F0}  Minerals");
        if (energy    > 0.1f) lines.Add($"+{energy:F0}  Energy");
        if (oxygen    > 0.1f) lines.Add($"+{oxygen:F0}  Oxygen");
        if (colonists > 0.1f) lines.Add($"+{colonists:F0}  Colonists");

        if (earningsText != null)
            earningsText.text = lines.Count > 0
                ? string.Join("\n", lines)
                : "Your colony rested while you were gone.";
    }

    private string FormatTime(long seconds)
    {
        if (seconds >= 3600) return $"{seconds / 3600}h {(seconds % 3600) / 60}m";
        if (seconds >= 60)   return $"{seconds / 60}m {seconds % 60}s";
        return $"{seconds}s";
    }
}
