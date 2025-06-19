'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  type: 'text' | 'single' | 'multiple';
  question: string;
  options?: string[];
}

export default function SurveyPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'text',
      question: '',
    },
  ]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const persona = localStorage.getItem('persona');
    if (!persona) {
      router.push('/persona');
    }
  }, [router]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: String(questions.length + 1),
        type: 'text',
        question: '',
      },
    ]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('surveyQuestions', JSON.stringify(questions));
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0058A3] tracking-tight">Create Survey</h1>
          <div className="w-16 h-1 bg-[#FFD200] mx-auto my-4 rounded-full" />
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Add questions to evaluate your persona
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="bg-white rounded-xl border border-[#B7D0E2] p-6 mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="pdf-upload"
              className="block text-base font-semibold text-[#0058A3] mb-1 min-w-fit"
            >
              Upload PDF (optional)
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={e => setPdfFile(e.target.files?.[0] || null)}
              className="block w-full sm:w-auto border border-[#B7D0E2] rounded-lg px-3 py-2 text-[#0058A3] focus:outline-none focus:ring-2 focus:ring-[#FFD200] focus:border-[#0058A3] transition"
            />
            {pdfFile && (
              <span className="text-sm text-gray-500 mt-1">Selected: {pdfFile.name}</span>
            )}
          </div>

          {questions.map((question) => (
            <div key={question.id} className="bg-white shadow-lg rounded-xl p-8 border border-[#E6E6E6] mb-4">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <label className="block text-base font-semibold text-[#0058A3] mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, 'question', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="ml-4 text-[#B94A00] font-bold hover:text-[#FFB800] text-lg"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-base font-semibold text-[#0058A3] mb-1">
                    Question Type
                  </label>
                  <select
                    value={question.type}
                    onChange={(e) =>
                      updateQuestion(
                        question.id,
                        'type',
                        e.target.value as Question['type']
                      )
                    }
                    className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                  >
                    <option value="text">Text</option>
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                </div>

                {(question.type === 'single' || question.type === 'multiple') && (
                  <div>
                    <label className="block text-base font-semibold text-[#0058A3] mb-1">
                      Options
                    </label>
                    <div className="mt-2 space-y-2">
                      {question.options?.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(question.options || [])];
                              newOptions[index] = e.target.value;
                              updateQuestion(question.id, 'options', newOptions);
                            }}
                            className="block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = question.options?.filter(
                                (_, i) => i !== index
                              );
                              updateQuestion(question.id, 'options', newOptions);
                            }}
                            className="ml-2 text-[#B94A00] font-bold hover:text-[#FFB800] text-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...(question.options || []), ''];
                          updateQuestion(question.id, 'options', newOptions);
                        }}
                        className="text-[#0058A3] font-bold hover:text-[#FFD200] text-lg"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={addQuestion}
              className="inline-flex items-center px-8 py-3 border border-[#0058A3] shadow text-lg font-bold rounded-lg text-[#0058A3] bg-white hover:bg-[#F0F6FA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 border border-transparent shadow text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
            >
              Continue to Results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 