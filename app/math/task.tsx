'use client';

import { useCallback, useEffect, useState } from "react";
import styles from './task.module.css';
import { EmojiHappy, EmojiSad, EmojiThinking } from "@/app/components/emojis";

type Task = {
    num1: number;
    num2: number;
}

type TaskMode = 'horizontal' | 'vertical';
type EmojiType = 'thinking' | 'happy' | 'sad';
type DifficultyLevel = 'easy' | 'middle' | 'hard';

export const Task = () => {
    let timeoutEmoji: NodeJS.Timeout;

    const [task, setTask] = useState<Task>();
    const [mode, setMode] = useState<TaskMode>('vertical');
    const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>("easy");
    const [inputResult, setInputResult] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>();
    const [emojiType, setEmojiType] = useState<EmojiType>('thinking');

    const generateNewTask = useCallback(() => {
        let maxNumber = 10;
        if (difficultyLevel === 'middle') {
            maxNumber = 20;
        }

        if (difficultyLevel === 'hard') {
            maxNumber = 99;
        }

        const num1 = Math.round(Math.random() * maxNumber);
        const num2 = Math.round(Math.random() * maxNumber);

        setTask({ num1, num2 });
    }, [difficultyLevel]);

    useEffect(() => {
        generateNewTask();
    }, [generateNewTask]);

    const validate = () => {
        if (inputResult === undefined) {
            return null;
        }

        if (task) {
            const { num1, num2 } = task;

            const correctResult = num1 + num2;
            if (parseInt(inputResult) === correctResult) {
                setIsValid(true);
                setEmojiType('happy');
                setTimeout(() => {
                    // Cleanup and generate New Task
                    clearTimeout(timeoutEmoji);
                    setEmojiType('thinking');
                    setInputResult("");
                    generateNewTask();
                }, 2000);
            } else {
                setEmojiType('sad');
                setIsValid(false);
                timeoutEmoji = setTimeout(() => {
                    setEmojiType('thinking');
                    setInputResult("");
                }, 2000);
            }
        }
    };

    const renderInput = () => {
        return (
            <input
                type="number"
                className={isValid === false ? 'input-invalid' : ''}
                value={inputResult}
                onChange={(e) => setInputResult(e.target.value)} />
        );
    }

    const renderHorizontal = () => {
        return (
            <div className={styles.taskHorizontal}>
                {task?.num1} + {task?.num2} = {renderInput()}
            </div>
        );
    }

    const renderVertical = () => {
        return (
            <div className={styles.taskVertical}>
                <div>{task?.num1}</div>
                <div className={styles.taskVerticalLastRow}>+ {task?.num2}</div>

                <div>{renderInput()}</div>
            </div>
        );
    }

    const renderTask = () => {
        if (mode === 'horizontal') {
            return renderHorizontal();
        }

        return renderVertical();
    };

    const renderEmoji = () => {
        if (emojiType === 'thinking') {
            return <EmojiThinking className="u-text-8xl" />;
        }

        if (emojiType === 'sad') {
            return <EmojiSad className="u-text-8xl" />
        }

        if (emojiType === 'happy') {
            return <EmojiHappy className="u-text-8xl" />
        }
    }

    return (
        <div className="task-container">
            <div>
                Modus:
                <button
                    className={mode === 'horizontal' ? 'active' : ''}
                    onClick={() => setMode('horizontal')}>Horizontal</button>
                <button
                    className={mode === 'vertical' ? 'active' : ''}
                    onClick={() => setMode('vertical')}>Vertikal</button>
            </div>
            <div className="u-mt-1">
                Schwierigkeitsstufe:
                <button
                    className={difficultyLevel === 'easy' ? 'active' : ''}
                    onClick={() => setDifficultyLevel('easy')}>Leicht</button>
                <button
                    className={difficultyLevel === 'middle' ? 'active' : ''}
                    onClick={() => setDifficultyLevel('middle')}>Mittel</button>
                <button
                    className={difficultyLevel === 'hard' ? 'active' : ''}
                    onClick={() => setDifficultyLevel('hard')}>Schwer</button>
            </div>

            <div className="u-mt-4 u-flex u-justify-center">
                <div className="u-flex">
                    {renderTask()}

                    <div className="u-ml-8">
                        {renderEmoji()}
                    </div>
                </div>
            </div>

            <div className="u-flex u-justify-end">
                <button className="btn-primary u-mt-3" onClick={validate} disabled={emojiType !== 'thinking'}>
                    Weiter
                </button>
            </div>
        </div>
    );
};
