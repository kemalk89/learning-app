import { EmojiFlag, EmojiOwl } from "@/app/components/emojis";
import { Task } from "@/app/math/task";
import './page.css';

export default function MathPage() {
    return (
        <>
            <h1>Mathe</h1>
            <div className="u-mt-2">
                <Task />
            </div>
        </>
    );
}
