import { useState } from 'react';

const faqs = [
  {
    question: 'What sizes do you offer?',
    answer: 'We offer sizes S, M, L, and XL for most of our products. Please check the size guide on each product page for specific measurements.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s website.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer free returns within 30 days of purchase. Items must be unworn and in original packaging with tags attached.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (2-3 business days) is available for an additional fee.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries. International shipping times and rates vary by location.',
  },
  {
    question: 'How do I care for my products?',
    answer: 'Care instructions are included on the label of each garment. Generally, we recommend washing in cold water and hanging to dry.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Frequently Asked Questions
        </h1>
        
        <div className="mt-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <span className="text-2xl">−</span>
                  ) : (
                    <span className="text-2xl">+</span>
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-4 text-gray-500">
            Contact our support team at{' '}
            <a
              href="mailto:support@northdusk.com"
              className="font-medium text-black hover:text-gray-800"
            >
              support@northdusk.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}