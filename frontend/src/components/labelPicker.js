import { FiX } from "react-icons/fi";

export const LABELS = [
    { key: "Indoor", cls: "labelIndoor", scopes: ["opportunity"] },
    { key: "Outdoor", cls: "labelOutdoor", scopes: ["opportunity"] },
    { key: "Weekend", cls: "labelWeekend", scopes: ["opportunity"] },
    { key: "Weekday", cls: "labelWeekday", scopes: ["opportunity"] },
    { key: "Shelter Update", cls: "labelShelter", scopes: ["announcement", "opportunity"] },
    { key: "Community News", cls: "labelCommunity", scopes: ["announcement", "opportunity"] },
    { key: "Fundraiser", cls: "labelFundraiser", scopes: ["announcement", "opportunity"] },
    { key: "Urgent", cls: "labelUrgent", scopes: ["announcement", "opportunity"] },
];

export default function LabelPicker({ selected, onChange, scope = "opportunity" }) {
    const scopedLabels = LABELS.filter((l) => l.scopes.includes(scope));
    const available = scopedLabels.filter((l) => !selected.includes(l.key));

    const addLabel = (key) => onChange([...selected, key]);
    const removeLabel = (key) => onChange(selected.filter((l) => l !== key));

    return (
        <div className="labelPicker">
            <p className="labelPickerHeading">
                {selected.length ? "Selected Label:" : "Labels Selected:"}
            </p>

            {selected.length === 0 && <p className="labelPickerEmpty">None selected</p>}

            {selected.length > 0 && (
                <div className="labelRow">
                    {selected.map((key) => {
                        const label = LABELS.find((l) => l.key === key);
                        return (
                            <button
                                key={key}
                                type="button"
                                className={`labelPill ${label.cls}`}
                                onClick={() => removeLabel(key)}
                            >
                                {key} <FiX aria-hidden="true" />
                            </button>
                        );
                    })}
                </div>
            )}

            <p className="labelPickerHeading">Add a Label:</p>
            <div className="labelRow">
                {available.map((label) => (
                    <button
                        key={label.key}
                        type="button"
                        className={`labelPill ${label.cls}`}
                        onClick={() => addLabel(label.key)}
                    >
                        {label.key}
                    </button>
                ))}
            </div>
        </div>
    );
}