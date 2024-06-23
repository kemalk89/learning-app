type ClassName = {
    condition?: boolean;
    className: string;
}

export const classNames = (names: Array<ClassName | string>): string => {
    const result: Array<string> = [];

    names.forEach(n => {
        if (typeof n === "string") {
            result.push(n);
            return;
        }

        const { condition, className } = n;
        if (condition) {
            result.push(className);
            return;
        }
    });

    return result.join(" ");
}