"use client";

import { useState } from "react";
import { useMiniAppContext } from "@/components/context/miniapp-provider";
import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { url } from "@/lib/metadata";

type Princess = "Cinderella" | "Belle" | "Ariel" | "Rapunzel" | "Tiana";

const questions = [
  {
    question: "What is your favorite type of adventure?",
    options: [
      { label: "A grand ball", princess: "Cinderella" as Princess },
      { label: "A library quest", princess: "Belle" as Princess },
      { label: "An ocean voyage", princess: "Ariel" as Princess },
      { label: "A magical tower climb", princess: "Rapunzel" as Princess },
      { label: "A culinary challenge", princess: "Tiana" as Princess },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { label: "Kind and humble", princess: "Cinderella" as Princess },
      { label: "Curious and brave", princess: "Belle" as Princess },
      { label: "Free-spirited", princess: "Ariel" as Princess },
      { label: "Creative and determined", princess: "Rapunzel" as Princess },
      { label: "Hardworking and generous", princess: "Tiana" as Princess },
    ],
  },
  {
    question: "What is your ideal setting?",
    options: [
      { label: "A royal palace", princess: "Cinderella" as Princess },
      { label: "A forested kingdom", princess: "Belle" as Princess },
      { label: "A seaside town", princess: "Ariel" as Princess },
      { label: "A hidden tower", princess: "Rapunzel" as Princess },
      { label: "A bustling city", princess: "Tiana" as Princess },
    ],
  },
  {
    question: "Which animal would you be?",
    options: [
      { label: "A loyal horse", princess: "Cinderella" as Princess },
      { label: "A wise owl", princess: "Belle" as Princess },
      { label: "A playful dolphin", princess: "Ariel" as Princess },
      { label: "A curious monkey", princess: "Rapunzel" as Princess },
      { label: "A friendly alligator", princess: "Tiana" as Princess },
    ],
  },
  {
    question: "What is your favorite pastime?",
    options: [
      { label: "Dancing", princess: "Cinderella" as Princess },
      { label: "Reading", princess: "Belle" as Princess },
      { label: "Swimming", princess: "Ariel" as Princess },
      { label: "Painting", princess: "Rapunzel" as Princess },
      { label: "Cooking", princess: "Tiana" as Princess },
    ],
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<(Princess | null)[]>(Array(questions.length).fill(null));
  const [result, setResult] = useState<Princess | null>(null);
  const { isInMiniApp } = useMiniAppContext();

  const handleSelect = (qIndex: number, princess: Princess) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = princess;
    setAnswers(newAnswers);
    if (newAnswers.every((a) => a !== null)) {
      computeResult(newAnswers as Princess[]);
    }
  };

  const computeResult = (selected: Princess[]) => {
    const scores: Record<Princess, number> = {
      Cinderella: 0,
      Belle: 0,
      Ariel: 0,
      Rapunzel: 0,
      Tiana: 0,
    };
    selected.forEach((p) => {
      scores[p] += 1;
    });
    const maxScore = Math.max(...Object.values(scores));
    const topPrincesses = Object.entries(scores)
      .filter(([, score]) => score === maxScore)
      .map(([princess]) => princess as Princess);
    setResult(topPrincesses[0]);
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
  };

  const shareText = result
    ? `I am most similar to ${result}! Take the Disney Princess Quiz: ${url}`
    : "";

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <h2 className="text-xl font-semibold">Disney Princess Quiz</h2>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">{result}</h3>
            <p className="text-muted-foreground">
              You share many qualities with {result}. Take the quiz again to see if you get a different result!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-medium">{q.question}</p>
                <RadioGroup
                  value={answers[idx] ?? ""}
                  onValueChange={(value) => handleSelect(idx, value as Princess)}
                >
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.princess} id={`${idx}-${oIdx}`} />
                      <Label htmlFor={`${idx}-${oIdx}`}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
        {result && (
          <Button onClick={resetQuiz} variant="outline">
            Retake Quiz
          </Button>
        )}
        {result && isInMiniApp && (
          <Share text={shareText} />
        )}
      </CardFooter>
    </Card>
  );
}
