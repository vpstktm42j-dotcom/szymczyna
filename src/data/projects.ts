import { assets } from './assets';

export interface Stat {
  value: string;
  label?: string;
  text: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  summary: string;
  award?: { title: string; subtitle: string };
  device: 'phone' | 'laptop';
  screens: string[];
  stats: Stat[];
  closing: { value: string; text: string };
}

export const projects: Project[] = [
  {
    id: 'mountain-guide',
    number: '01',
    title: 'Mountain Guide App',
    award: { title: 'Distinction', subtitle: 'XVIII edition of UX & Product Design studies' },
    summary:
      'Designed a first-aid application for the Ayola Foundation as part of my UX studies at AGH University. The goal was to help people respond more effectively to the growing number of emergencies in the Polish mountains. Research, including interviews with tourists, helped to understand the needs of people providing first aid in challenging mountain terrain. The project was selected as the best in the course.',
    device: 'phone',
    screens: [assets.mg01, assets.mg02, assets.mg03, assets.mg04, assets.mg05, assets.mg06, assets.mg07, assets.mg08],
    stats: [
      {
        value: '5M+',
        label: 'people visit the Polish Tatra Mountains.',
        text: 'Trips are inspired by social media, but preparation doesn’t always come with them. Preparing for the weather conditions is key to reducing the risk of unexpected situations.',
      },
      {
        value: '+36%',
        label: 'increase in rescue interventions year over year.',
        text: 'Even well-prepared hikers may face situations they are not ready to handle. Step-by-step guidance helps them provide first aid on their own, potentially reducing the need for professional rescue intervention.',
      },
      {
        value: 'No signal',
        label: 'in the mountains.',
        text: 'An offline guide keeps essential information available when hikers lose internet access. A help request can be sent over a weak connection, containing basic location data.',
      },
      {
        value: '2–3x',
        label: 'higher chance of survival',
        text: 'Real-time camera guidance helps hikers perform CPR correctly. Correct technique can significantly improve survival.',
      },
    ],
    closing: {
      value: 'AI chat…',
      text: "…doesn't work under stress. And there's a reason it was left out of the solution.",
    },
  },
  {
    id: 'test-execute',
    number: '02',
    title: 'Test Execute App',
    summary:
      'Designed and developed an internal tool to automate UI test execution for a public sector system deployed across multiple locations. It replaces complex, time-consuming manual testing procedures performed on physical servers. The goal was to reduce the time QA engineers and developers spend running tests manually.',
    device: 'laptop',
    screens: [assets.testExecuteScreen],
    stats: [
      {
        value: '14x',
        label: 'faster installation',
        text: 'By automating manual procedures, the application reduces installation time and the effort required from developers. No need to remember complex procedures.',
      },
      {
        value: 'One-click',
        label: 'run',
        text: 'A single click replaces an installation process that was prone to human error.',
      },
      {
        value: '25x',
        label: 'faster bug diagnosis',
        text: 'When a test fails, developers can quickly identify what went wrong. Each failure includes configurable details and a screen recording, making investigation easier.',
      },
    ],
    closing: {
      value: 'The real solution',
      text: 'The original approach only treated the symptoms. The whole app was replaced and addressed the root cause.',
    },
  },
];
