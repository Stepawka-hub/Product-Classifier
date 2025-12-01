import { Classifier } from '../entities/classifier.entity';

export class ClassifierBaseDto {
  id: number;
  name: string;

  constructor(classifier: Classifier) {
    this.id = classifier.id;
    this.name = classifier.name;
  }
}

export class ClassifierDto extends ClassifierBaseDto {
  unitName: string | null;
  parentName: string | null;

  constructor(classifier: Classifier) {
    super(classifier);
    this.unitName = classifier.unit?.name || null;
    this.parentName = classifier.parent?.name || null;
  }
}
