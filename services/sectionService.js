import VerbService from './verbService';

class SectionService {
  NUMBER_OF_SECTIONS = 12; // 118 verbs in 12 sections, 10 verbs per sections. 10 * 12 = 120
  verbs;
  sections;

  constructor(verbService) {
    this.verbService = new VerbService();
  }

  getSections() {
    this.sections = [];
    this.verbs = this.verbService.getAll();
    for (let i = 1; i <= this.NUMBER_OF_SECTIONS; i++) {
      const sectionVerbs = this.spliceSectionVerbs();
      this.sections.push({
        id: i,
        title: `Lesson ${i}`,
        current: null, // Math.floor(Math.random() * (8 + 1)), // data from server, user progress...
        max: sectionVerbs.length,
        verbs: sectionVerbs,
      });
    }
    return this.sections;
  }

  getSectionById(sectionId) {
    if (this.sections.length === 0) {
      this.getSections();
    }
    return this.sections.find(section => section.id === sectionId);
  }

  spliceSectionVerbs() {
    return this.verbs.splice(0, 10);
  }
}

export default SectionService;
