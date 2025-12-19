import React from 'react';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout 
      title="About Me" 
      description="Learn more about my background and expertise"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Professional Background</h2>

            <div className="space-y-4 text-gray-700 mb-8">
              <p>
                I am inspired to make impact on software development in the projects I work for.
                Working as a consultant since 2005, I've had the opportunity to see many different
                companies and work within different domains. I have experience in designing software
                architecture as well as realising it by making part of the teams to develop the software.
              </p>

              <p>
                I have experience in giving presentations for smaller and larger groups and as a former
                certified Lightbend trainer I know what it is to transfer knowledge.
              </p>

              <p>
                <strong>Personal qualities:</strong> Team player, Pragmatic, I love to solve complex problems
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4">Specialties</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="space-y-3">
                {['AI Development Advocate', 'Software Architecture', 'Software Development', 'Domain-Driven Design (DDD)'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {['Distributed Systems', 'Event Driven Architecture (EDA)', 'Event Sourcing / CQRS', 'Cloud Technologies'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Recent Experience</h3>
            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-lg">Senior Software Developer & AI Development Advocate</h4>
                <p className="text-gray-600">
                  Ahold Delhaize
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">via Inspired IT</span>
                  <span className="mx-1">·</span>
                  Apr 2025 - Present
                </p>
                <p className="text-gray-700 mt-2">
                  Building the Gambit ad platform. As an AI advocate at Gambit, I'm learning more about AI
                  technologies and exploring how to effectively apply them in the organization.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: GitHub Copilot, ChatGPT, Claude, Gemini, Kotlin, Spring Boot
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-bold text-lg">Senior Software Developer</h4>
                <p className="text-gray-600">
                  DHL Parcel Nederland
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">via Inspired IT</span>
                  <span className="mx-1">·</span>
                  Jul 2022 - Apr 2025
                </p>
                <p className="text-gray-700 mt-2">
                  Designed and developed the Track & Trace system for DHL Parcel. Member of the architecture
                  team, driving Domain-Driven Design and Ports and Adapters architecture. Co-leader of the
                  backend guild.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: Scala, ZIO, Event Driven Architecture, Cloud
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-bold text-lg">Software Architect & Tech Lead</h4>
                <p className="text-gray-600">
                  bol.com
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">via Inspired IT</span>
                  <span className="mx-1">·</span>
                  Jan 2021 - Jul 2022
                </p>
                <p className="text-gray-700 mt-2">
                  Designed and developed a new event-driven architecture to process thousands of offer
                  changes per second. Led teams in implementing the new architecture while also developing
                  components.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: Kotlin, Spring, Event Driven Architecture, Cloud
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-bold text-lg">Software Architect / Senior Developer</h4>
                <p className="text-gray-600">
                  Port of Rotterdam
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">via Inspired IT</span>
                  <span className="mx-1">·</span>
                  Apr 2018 - Jul 2019
                </p>
                <p className="text-gray-700 mt-2">
                  Designed and built a platform for railway transport to the Port of Rotterdam, providing
                  an integrated view for collaboration between parties.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: Kotlin, Spring Boot, PostgreSQL, Kubernetes, Angular
                </p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://www.linkedin.com/in/jeroengordijn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                For more, see LinkedIn →
              </a>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            {/* Profile picture - try different styles */}
            <div className="mb-6 flex flex-col items-center gap-4">
              <img
                src="/images/profile_pic_front.png"
                alt="Jeroen Gordijn"
                className="w-32 h-40 rounded-xl object-cover shadow-lg"
              />   
            </div>
            <h3 className="font-bold text-lg mb-6">Quick Facts</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="font-semibold block text-slate-900">Years of Experience</span>
                <span className="text-gray-600">20+ years (since 2005)</span>
              </li>
              <li>
                <span className="font-semibold block text-slate-900">Current Role</span>
                <span className="text-gray-600">Senior Developer at Ahold Delhaize</span>
              </li>
              <li>
                <span className="font-semibold block text-slate-900">Primary Languages</span>
                <span className="text-gray-600">Kotlin, Java</span>
              </li>
              <li>
                <span className="font-semibold block text-slate-900">Location</span>
                <span className="text-gray-600">Hilversum, Netherlands</span>
              </li>
              <li>
                <span className="font-semibold block text-slate-900">Education</span>
                <span className="text-gray-600">Master's, Software Technology<br />Utrecht University</span>
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Services & Consulting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">AI-Assisted Development</h3>
              <p className="text-gray-700">
                Learn how to leverage AI tools to accelerate your development workflow.
                Practical guidance on integrating AI assistants into your daily coding practice.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Technical Team Leadership</h3>
              <p className="text-gray-700">
                Mentoring and leadership for development teams. Help establish processes,
                standards, and foster a culture of continuous improvement.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Architecture Consultation</h3>
              <p className="text-gray-700">
                Help design scalable, maintainable systems that grow with your business.
                From monoliths to microservices, I provide guidance on architectural decisions.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Code Review & Optimization</h3>
              <p className="text-gray-700">
                Comprehensive reviews of your codebase focusing on quality, performance,
                and best practices. Actionable recommendations for improvement.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-slate-200 mb-6">
            Whether you need consultation, collaboration, or want to discuss
            software architecture and development, let's connect on LinkedIn.
          </p>
          <a
            href="https://www.linkedin.com/in/jeroengordijn/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn
          </a>
        </section>
      </div>
    </Layout>
  );
}
