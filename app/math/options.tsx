import styles from "./task.module.css";

export type Operation = "plus" | "minus";
export type TaskMode = "horizontal" | "vertical";
export type DifficultyLevel = "easy" | "middle" | "hard";

type Props = {
  operation?: Operation;
  mode?: TaskMode;
  difficultyLevel?: DifficultyLevel;
  onOperationSelected: (operation: Operation) => void;
  onModeSelected: (mode: TaskMode) => void;
  onDifficultyLeveSelected: (mode: DifficultyLevel) => void;
};

export const Options = ({
  operation,
  mode,
  difficultyLevel,
  onOperationSelected,
  onDifficultyLeveSelected,
  onModeSelected,
}: Props) => {
  return (
    <>
      <div className={styles.optionRow}>
        <div className={styles.optionLabel}>Operation</div>
        <div>
          <button
            className={operation === "plus" ? "active" : ""}
            onClick={() => onOperationSelected("plus")}
          >
            Plus
          </button>
          <button
            className={operation === "minus" ? "active" : ""}
            onClick={() => onOperationSelected("minus")}
          >
            Minus
          </button>
        </div>
      </div>
      <div className={[styles.optionRow, "u-mt-1"].join(" ")}>
        <div className={styles.optionLabel}>Modus</div>
        <div>
          <button
            className={mode === "horizontal" ? "active" : ""}
            onClick={() => onModeSelected("horizontal")}
          >
            Horizontal
          </button>
          <button
            className={mode === "vertical" ? "active" : ""}
            onClick={() => onModeSelected("vertical")}
          >
            Vertikal
          </button>
        </div>
      </div>
      <div className={[styles.optionRow, "u-mt-1"].join(" ")}>
        <div className={styles.optionLabel}>Schwierigkeitsstufe</div>
        <div>
          <button
            className={difficultyLevel === "easy" ? "active" : ""}
            onClick={() => onDifficultyLeveSelected("easy")}
          >
            Leicht
          </button>
          <button
            className={difficultyLevel === "middle" ? "active" : ""}
            onClick={() => onDifficultyLeveSelected("middle")}
          >
            Mittel
          </button>
          <button
            className={difficultyLevel === "hard" ? "active" : ""}
            onClick={() => onDifficultyLeveSelected("hard")}
          >
            Schwer
          </button>
        </div>
      </div>
    </>
  );
};
