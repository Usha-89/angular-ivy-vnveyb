import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App implements OnInit {
  hypothesisCorrect = false;
  hypothesisInCorrect = false;
  hypothesisNeither = false;
  justificationYes = false;
  justificationNo = false;
  myAnswerJustification = '';
  context = '';
  hypothesis = '';
  answer = '';
  explanation = '';
  id = '';
  explanationYes = false;
  explanationNo = false;

  /**
   * This method is called after constructor is called.
   */
  ngOnInit() {
    this.crowdService.getQuestion().subscribe((data) => {
      if (!data.attributes || !data.id) return;
      this.id = data.id;
      this.context = data.attributes[0].value;
      this.hypothesis = data.attributes[1].value;
      this.answer = data.attributes[2].value;
      this.explanation = data.attributes[3].value;
    });
  }

  updateCheckBox(type: string) {
    if (type === 'correct' && this.hypothesisCorrect) {
      this.hypothesisInCorrect = false;
      this.hypothesisNeither = false;
    } else if (type === 'incorrect' && this.hypothesisInCorrect) {
      this.hypothesisCorrect = false;
      this.hypothesisNeither = false;
    } else if (type === 'neither' && this.hypothesisNeither) {
      this.hypothesisCorrect = false;
      this.hypothesisInCorrect = false;
    }
  }

  updateJustificationSelection(type: string) {
    if (type === 'yes' && this.justificationYes) {
      this.justificationNo = false;
    } else if (type === 'no' && this.justificationNo) {
      this.justificationYes = false;
    }
  }
  updateExplanationSelection(type: string) {
    if (type === 'yes' && this.explanationYes) {
      this.justificationNo = false;
    } else if (type === 'no' && this.explanationNo) {
      this.explanationYes = false;
    }
  }
  /**
   * Used to enable/disable submit button
   */
  disableSubmit(): boolean {
    let hypothesisInValid = true;
    let justificationInValid = true;
    let explanationInvalid = true;
    if (
      this.hypothesisCorrect ||
      this.hypothesisInCorrect ||
      this.hypothesisNeither
    ) {
      hypothesisInValid = false;
    }

    if (this.justificationYes || this.justificationNo) {
      justificationInValid = false;
    }
    if (this.explanationYes || this.explanationNo) {
      explanationInvalid = false;
    }
    if (hypothesisInValid || justificationInValid || explanationInvalid) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Used to submit data to CC
   */
  onSubmit() {
    let hypothesis = '';
    if (this.hypothesisCorrect) {
      hypothesis = 'correct';
    } else if (this.hypothesisInCorrect || this.hypothesisNeither) {
      hypothesis = 'incorrect';
    } else {
      hypothesis = 'neither';
    }

    let justification = '';
    if (this.justificationYes) {
      justification = 'yes';
    } else {
      justification = 'no';
    }
    let explanation = '';
    if (this.explanationYes) {
      explanation = 'yes';
    } else {
      explanation = 'no';
    }
    const answer = {
      id: this.id,
      hypothesis: hypothesis,
      justification: justification,
      explanation: explanation,
      comments: this.myAnswerJustification,
    };
    console.log(answer);
    this.crowdService.submitAnswer(answer);
  }

  /**
   * Creating an instance using injecting the param CCLib
   */
  constructor(private readonly crowdService: CrowdService) {
    this.crowdService.init();
  }
}
