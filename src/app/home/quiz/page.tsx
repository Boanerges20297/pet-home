
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Award, BrainCircuit, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const quizQuestions = [
  {
    question: "Qual raça de cachorro é conhecida por sua língua azul-preta?",
    options: ["Chow Chow", "Husky Siberiano", "Golden Retriever", "Poodle"],
    answer: "Chow Chow"
  },
  {
    question: "Gatos podem sentir o sabor doce?",
    options: ["Sim", "Não", "Apenas alguns", "Somente quando filhotes"],
    answer: "Não"
  },
  {
    question: "Qual o tempo médio de gestação de uma cadela?",
    options: ["30 dias", "63 dias", "90 dias", "120 dias"],
    answer: "63 dias"
  },
  {
    question: "Qual destes animais NÃO é um roedor?",
    options: ["Hamster", "Coelho", "Porquinho-da-índia", "Chinchila"],
    answer: "Coelho"
  },
  {
    question: "Como os gatos demonstram felicidade e contentamento?",
    options: ["Apenas miando", "Abanando o rabo", "Ronronando", "Esfregando o nariz"],
    answer: "Ronronando"
  },
  {
    question: "Qual é o cão mais rápido do mundo?",
    options: ["Galgo Inglês (Greyhound)", "Doberman", "Border Collie", "Vira-lata Caramelo"],
    answer: "Galgo Inglês (Greyhound)"
  },
  {
    question: "Quantos 'dedos' um gato normalmente tem nas patas dianteiras?",
    options: ["4", "5", "6", "Depende da raça"],
    answer: "5"
  },
  {
    question: "Qual pássaro é conhecido por sua habilidade de imitar a fala humana?",
    options: ["Pombo", "Canário", "Papagaio", "Galinha"],
    answer: "Papagaio"
  },
  {
    question: "O que significa quando um cão abana o rabo para a direita?",
    options: ["Medo", "Raiva", "Felicidade e sentimentos positivos", "Tristeza"],
    answer: "Felicidade e sentimentos positivos"
  },
  {
    question: "Qual é o sentido mais apurado de um cão?",
    options: ["Visão", "Paladar", "Tato", "Olfato"],
    answer: "Olfato"
  }
];

export default function QuizPage() {
  const { addCoins } = usePlayer();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quizQuestions[currentQuestionIndex].answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      if (score + (quizQuestions[currentQuestionIndex].answer === selectedAnswer ? 1 : 0) === quizQuestions.length) {
        addCoins(100);
        toast({
          title: 'Parabéns!',
          description: 'Você acertou todas as perguntas e ganhou 100 moedas!',
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  if (quizFinished) {
    return (
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Quiz Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Award className="h-24 w-24 mx-auto text-yellow-500" />
              <p className="text-xl">Sua pontuação final foi:</p>
              <p className="font-bold text-5xl">{score} / {quizQuestions.length}</p>
              {score === quizQuestions.length ? (
                <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Parabéns! Você é um mestre de mascotes!</h3>
                  <p className="text-green-600 dark:text-green-400">Você ganhou 100 moedas por seu conhecimento impecável.</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Continue estudando e tente novamente para ganhar a recompensa máxima!</p>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleRestartQuiz} size="lg" className="w-full">
                <RefreshCw className="mr-2 h-5 w-5" />
                Jogar Novamente
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-3xl md:text-4xl text-primary flex items-center gap-2">
                    <BrainCircuit className="h-8 w-8"/> Quiz de Filhotes
                </CardTitle>
                <div className="text-lg font-bold">
                    Pontos: {score}
                </div>
            </div>
            <CardDescription className="text-base">
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </CardDescription>
            <Progress value={progressPercentage} className="w-full h-2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg md:text-xl font-semibold text-center">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map(option => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = option === selectedAnswer;
                
                let buttonVariant: "default" | "secondary" | "destructive" | "outline" = "outline";
                let icon = null;

                if(isAnswered){
                    if(isSelected) {
                        buttonVariant = isCorrect ? 'secondary' : 'destructive';
                    }
                    if(isCorrect){
                        icon = <CheckCircle className="h-5 w-5 text-green-500" />;
                    } else if (isSelected){
                        icon = <XCircle className="h-5 w-5 text-white" />;
                    }
                }
                
                return (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    variant={buttonVariant}
                    className={`h-auto justify-between p-4 text-base whitespace-normal ${
                      isAnswered && isCorrect ? 'bg-green-100 dark:bg-green-900 border-green-400' : ''
                    } ${
                      isAnswered && isSelected && !isCorrect ? 'bg-red-500 text-white border-red-700' : ''
                    }`}
                  >
                    <span>{option}</span>
                    {icon}
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            {isAnswered && (
                <Button onClick={handleNextQuestion} className="w-full" size="lg">
                    {currentQuestionIndex < quizQuestions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
                </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
