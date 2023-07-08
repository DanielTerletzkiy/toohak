import { Injectable } from '@nestjs/common';

@Injectable()
export class NameGeneratorService {
    private readonly colors: string[] = [
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Purple',
        'Orange',
        // Add more colors as needed
      ];
    
      private readonly animals: string[] = [
        'Lion',
        'Tiger',
        'Elephant',
        'Giraffe',
        'Monkey',
        'Zebra',
        // Add more animals as needed
      ];

      generateRandomName(): string {
        const randomColorIndex = Math.floor(Math.random() * this.colors.length);
        const randomAnimalIndex = Math.floor(Math.random() * this.animals.length);
        const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
    
        const color = this.colors[randomColorIndex];
        const animal = this.animals[randomAnimalIndex];
    
        return `${color}-${animal}-${randomNumber}`;
      }
}
