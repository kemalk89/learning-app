"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./task.module.css";
import { Emoji } from "@/app/math/emoji";
import {
  DifficultyLevel,
  Operation,
  Options,
  TaskMode,
} from "@/app/math/options";
import { ProgressBar, Step } from "@/app/components/progress-bar";

type Task = {
  num1: number;
  num2: number;
  operation: Operation;
  answer?: number;
  answerStatus?: "correct" | "wrong";
};

type EmojiType = "thinking" | "happy" | "sad";

export const Task = () => {
  let timeoutEmoji: NodeJS.Timeout;

  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [operation, setOperation] = useState<Operation>("plus");
  const [mode, setMode] = useState<TaskMode>("vertical");
  const [difficultyLevel, setDifficultyLevel] =
    useState<DifficultyLevel>("easy");

  const [inputResult, setInputResult] = useState<string>("");
  const [emojiType, setEmojiType] = useState<EmojiType>("thinking");

  const generateNewTask = () => {
    let maxNumber = 10;
    if (difficultyLevel === "middle") {
      maxNumber = 20;
    }

    if (difficultyLevel === "hard") {
      maxNumber = 99;
    }

    let num1 = Math.round(Math.random() * maxNumber);
    let num2 = Math.round(Math.random() * maxNumber);

    if (operation === "minus") {
      const tmpNum1 = Math.max(num1, num2);
      const tmpNum2 = Math.min(num1, num2);
      num1 = tmpNum1;
      num2 = tmpNum2;
    }

    const newTask: Task = {
      operation,
      num1,
      num2,
    };

    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    generateNewTask();
  }, []);

  const validate = () => {
    if (inputResult === undefined) {
      return null;
    }

    const latestTask = tasks.at(-1);

    if (latestTask) {
      latestTask.answer = parseInt(inputResult);
      const { num1, num2, answer } = latestTask;

      const correctResult = operation === "plus" ? num1 + num2 : num1 - num2;
      if (answer === correctResult) {
        latestTask.answerStatus = "correct";
        setEmojiType("happy");
        setTimeout(() => {
          // Cleanup and generate New Task
          clearTimeout(timeoutEmoji);
          setEmojiType("thinking");
          setInputResult("");
          setSelectedStep(tasks.length);

          generateNewTask();
        }, 2000);
      } else {
        latestTask.answerStatus = "wrong";

        setEmojiType("sad");
        timeoutEmoji = setTimeout(() => {
          setEmojiType("thinking");
          setInputResult("");
        }, 2000);
      }
    }
  };

  const renderInput = () => {
    const task = getTask(selectedStep);
    if (task) {
      return (
        <input
          type="number"
          className={
            tasks.at(-1)?.answerStatus === "wrong" ? "input-invalid" : ""
          }
          value={inputResult}
          onFocus={() => setInputResult("")}
          onChange={(e) => setInputResult(e.target.value)}
        />
      );
    }

    return null;
  };

  const getTask = (step: number): Task | undefined => {
    if (step !== tasks.length - 1) {
      return tasks.at(step);
    }

    return tasks.at(-1);
  };

  const renderHorizontal = () => {
    const task = getTask(selectedStep);
    if (task) {
      return (
        <div className={styles.taskHorizontal}>
          <span data-testid="num1">{task.num1}</span> +{" "}
          <span data-testid="num2">{task.num2}</span> = {renderInput()}
        </div>
      );
    }

    return null;
  };

  const renderVertical = () => {
    const task = getTask(selectedStep);
    if (task) {
      return (
        <div className={styles.taskVertical}>
          <div data-testid="num1">{task.num1}</div>
          <div className={styles.taskVerticalLastRow}>
            <span>{operation === "plus" ? "+" : "-"}</span>
            <span data-testid="num2">{task.num2}</span>
          </div>

          <div>{renderInput()}</div>
        </div>
      );
    }

    return null;
  };

  const renderTask = () => {
    if (mode === "horizontal") {
      return renderHorizontal();
    }

    return renderVertical();
  };

  const getSteps = () => {
    let maxSteps = 10;

    const steps: Step[] = Array.from({ length: maxSteps }, (_, i) => {
      const task = tasks.at(i);
      if (task && task.answerStatus) {
        return {
          status: task.answerStatus === "correct" ? "success" : "fail",
        };
      }

      return { status: undefined };
    });

    return steps;
  };

  return (
    <div className="task-container">
      <Options
        mode={mode}
        operation={operation}
        difficultyLevel={difficultyLevel}
        onDifficultyLeveSelected={setDifficultyLevel}
        onModeSelected={setMode}
        onOperationSelected={setOperation}
      />

      <div className="u-mt-8">
        <ProgressBar
          onClickStep={(step) => {
            if (step < tasks.length) {
              setSelectedStep(step);
              const task = getTask(step);
              if (task && task.answer) {
                setInputResult(task.answer.toString() as string);
              }
            }
          }}
          steps={getSteps()}
          current={selectedStep}
        />
      </div>

      <div
        className={[
          styles.taskContainer,
          "u-mt-4",
          "u-flex u-justify-center",
        ].join(" ")}
      >
        <div className="u-flex">
          {renderTask()}

          <div className="u-ml-8">
            <Emoji type={emojiType} />
          </div>
        </div>
      </div>

      <div className="u-flex u-justify-end">
        <button
          className="btn-primary u-mt-3"
          onClick={validate}
          disabled={emojiType !== "thinking"}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};
