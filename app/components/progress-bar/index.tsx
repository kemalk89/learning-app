import { classNames } from "@/app/helpers/utils";
import styles from "./styles.module.css";

export type Step = {
  status?: "success" | "fail";
};

type Props = {
  steps: Step[];
  current: number;
  onClickStep: (step: number) => void;
};

export const ProgressBar = ({ steps, current, onClickStep }: Props) => {
  return (
    <div className={styles.progressBar}>
      {steps.map((step, index) => (
        <button
          key={index}
          className={classNames([
            styles.step,
            {
              condition: current === index,
              className: styles.current,
            },
            {
              condition: step.status && step.status === "success",
              className: styles.success,
            },
            {
              condition: step.status && step.status === "fail",
              className: styles.fail,
            },
          ])}
          onClick={() => onClickStep(index)}
        />
      ))}
    </div>
  );
};
