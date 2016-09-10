import {Component, ElementRef, Inject, Output, EventEmitter, Input, AfterViewInit, OnDestroy} from '@angular/core';
declare const tinymce:any;
@Component({
  moduleId: module.id,
  template: `
<div id='tinyFormGroup' class='form-group'>
    <div class='hidden'>
        <div id='baseTextArea'></div>
    </div>
</div> `,
  selector: 'bc-tinymce',
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {

  @Output() contentChanged: EventEmitter<any> = new EventEmitter();
  elementRef: ElementRef;
  elementID: string;
  htmlContent: string;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    this.elementID = 'tinymce' + uniqid;
  }

  ngAfterViewInit() {
    //Clone base textarea
    var baseTextArea = this.elementRef.nativeElement.querySelector('#baseTextArea');
    // var clonedTextArea = baseTextArea.cloneNode(true);
    baseTextArea.id = this.elementID;

    var formGroup = this.elementRef.nativeElement.querySelector('#tinyFormGroup');
    formGroup.appendChild(baseTextArea);

    //Attach tinyMCE to cloned textarea
    tinymce.init(
      {
        mode: 'exact',
        height: 200,
        theme: 'modern',
        theme_url:'/assets/tinymce/themes/modern/theme.min.js',
        skin_url:'/assets/tinymce/skins/light',
        elements: this.elementID,
        setup: this.tinyMCESetup.bind(this)
      }
    );
  }

  ngOnDestroy() {
    //destroy cloned elements
    tinymce.get(this.elementID).remove();

  }


  tinyMCESetup(ed:any ) {
    let that = this;
    ed.on('change', this.tinyMCEOnKeyup.bind(this));
    ed.on('init',function(e:any ) {
      if(typeof that.htmlContent !== 'undefined') {
        e.target.setContent(that.htmlContent);
      }
    });
  }

  tinyMCEOnKeyup(e:any) {
    this.contentChanged.emit(tinymce.get(this.elementID).getContent());
  }


  @Input()
  set mceContent(content:any) {
    this.htmlContent = content;
  }
}
