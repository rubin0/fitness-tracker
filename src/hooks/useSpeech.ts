import { useCallback } from "react";

export const useSpeech = (lang: string = "en-US", rate: number = 1) => {
    return useCallback(
        (text: string): Promise<void> => {
            return new Promise((resolve) => {
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = lang;
                utter.rate = rate;
                utter.onend = () => setTimeout(() => resolve(), 500);
                utter.onerror = () => resolve();
                speechSynthesis.speak(utter);
            });
        },
        [lang, rate]
    );
};