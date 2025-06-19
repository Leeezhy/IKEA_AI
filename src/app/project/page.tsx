'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectPage() {
  const router = useRouter();
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    description: '',
    goals: [''],
  });
  const [targetGroup, setTargetGroup] = useState({
    demographics: {
      age: '',
      gender: '',
      location: '',
    },
    characteristics: [''],
    needs: [''],
    description: '',
  });
  const [personaCount, setPersonaCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store data in localStorage
    localStorage.setItem('projectInfo', JSON.stringify(projectInfo));
    localStorage.setItem('targetGroup', JSON.stringify(targetGroup));
    localStorage.setItem('personaCount', String(personaCount));
    // Navigate to persona page
    router.push('/persona');
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0058A3] tracking-tight">Project & Target Group Information</h1>
          <div className="w-16 h-1 bg-[#FFD200] mx-auto my-4 rounded-full" />
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Please provide information about your project and target group
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Project Information Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 border border-[#E6E6E6]">
            <h2 className="text-2xl font-bold text-[#0058A3] mb-6">Project Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="projectName" className="block text-base font-semibold text-[#0058A3] mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectInfo.name}
                  onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-base font-semibold text-[#0058A3] mb-1">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  value={projectInfo.description}
                  onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Target Group Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 border border-[#E6E6E6]">
            <h2 className="text-2xl font-bold text-[#0058A3] mb-6">Target Group Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="age" className="block text-base font-semibold text-[#0058A3] mb-1">
                    Age Range
                  </label>
                  <input
                    type="text"
                    id="age"
                    value={targetGroup.demographics.age}
                    onChange={(e) =>
                      setTargetGroup({
                        ...targetGroup,
                        demographics: { ...targetGroup.demographics, age: e.target.value },
                      })
                    }
                    className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-base font-semibold text-[#0058A3] mb-1">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={targetGroup.demographics.gender}
                    onChange={(e) =>
                      setTargetGroup({
                        ...targetGroup,
                        demographics: { ...targetGroup.demographics, gender: e.target.value },
                      })
                    }
                    className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-base font-semibold text-[#0058A3] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={targetGroup.demographics.location}
                    onChange={(e) =>
                      setTargetGroup({
                        ...targetGroup,
                        demographics: { ...targetGroup.demographics, location: e.target.value },
                      })
                    }
                    className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="targetDescription" className="block text-base font-semibold text-[#0058A3] mb-1">
                  Target Group Detailed Description
                </label>
                <textarea
                  id="targetDescription"
                  value={targetGroup.description || ''}
                  onChange={(e) => setTargetGroup({ ...targetGroup, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                  placeholder="Describe the characteristics, lifestyle, preferences, and other details of your target group..."
                  required
                />
              </div>
              <div>
                <label htmlFor="personaCount" className="block text-base font-semibold text-[#0058A3] mb-1">
                  Number of Personas to Generate
                </label>
                <input
                  type="number"
                  id="personaCount"
                  min={1}
                  max={10}
                  value={personaCount}
                  onChange={e => setPersonaCount(Number(e.target.value))}
                  className="mt-1 block w-32 rounded-lg border-2 border-[#B7D0E2] focus:border-[#0058A3] focus:ring-2 focus:ring-[#FFD200] px-3 py-2 text-lg transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 border border-transparent shadow-lg text-lg font-bold rounded-lg text-[#0058A3] bg-[#FFD200] hover:bg-[#FFB800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058A3] transition"
            >
              Continue to Persona Generation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 