import { Component, OnInit } from '@angular/core';
import { IPerson } from './model/person';

// @VisibleForTesting
export const HONCHOS: IPerson[] = [
  {
    name: 'James Lott',
    title: 'Founder, CEO',
    linkedinUrl: 'https://www.linkedin.com/in/jameslottchicago',
    portraitUri: '/assets/img/james.jpg'
  },
  {
    name: 'Straker Carryer',
    title: 'Chief Technology Officer',
    linkedinUrl: 'https://www.linkedin.com/in/strakerc',
    portraitUri: '/assets/img/straker.jpg'
  }
];

const LAYS: IPerson[] = [
  {
    name: 'Maryiam Saifuddin',
    title: 'Partnerships Manager',
    linkedinUrl: 'https://www.linkedin.com/in/maryiamsaifuddin',
    portraitUri: '/assets/img/maryiam.jpg'
  },
  {
    name: 'Joy Rooney',
    title: 'Outreach',
    linkedinUrl: 'https://www.linkedin.com/in/joy-rooney-p-e-712a9025',
    portraitUri: '/assets/img/joy.jpeg'
  },
  {
    name: 'Gracelyn Newhouse',
    title: 'Strategy',
    linkedinUrl: 'https://www.linkedin.com/in/gracelyn-newhouse-702a245a',
    portraitUri: '/assets/img/gracelyn.jpeg'
  },
  {
    name: 'Azeez Alli',
    title: 'UX/UI Consultant',
    linkedinUrl: 'https://www.linkedin.com/in/azeezalli',
    portraitUri: '/assets/img/azeez.jpeg'
  },
  {
    name: 'Ryan Conrad',
    title: 'Development',
    linkedinUrl: 'https://www.linkedin.com/in/ryan-conrad-96a19a11a',
    portraitUri: '/assets/img/ryan.jpg'
  },
  {
    name: 'Balaji Shyamsundar',
    title: 'Development',
    linkedinUrl: 'https://www.linkedin.com/in/balaji-shyamsundar-b2b26b39',
    portraitUri: '/assets/img/balaji.jpg'
  },
  {
    name: 'Jehwa Shin',
    title: 'Development',
    linkedinUrl: 'https://www.linkedin.com/in/jehwa',
    portraitUri: '/assets/img/jehwa.jpeg'
  },
  {
    name: 'Victoria Constant',
    title: 'Metcalf Intern',
    linkedinUrl: 'https://www.linkedin.com/in/victoria-constant-b3a715115',
    portraitUri: '/assets/img/victoria.jpg'
  }
];

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.pug',
  styleUrls: ['./our-team.component.styl']
})
export class OurTeamComponent implements OnInit {
  public readonly honchos: IPerson[] = HONCHOS;
  public readonly lays: IPerson[] = LAYS;

  constructor() { }

  ngOnInit() {
  }

}
