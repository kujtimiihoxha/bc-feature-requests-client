import {Component, ElementRef, Inject, Output, EventEmitter, Input} from '@angular/core';
declare const tinymce:any;
@Component({
  moduleId: module.id,
  template: `
<div id="tinyFormGroup" class="form-group">
    <div class="hidden">
        <div id="baseTextArea"></div>
    </div>
</div> `,
  selector: 'bc-tinymce',
})
export class TinyEditor {

  private elementRef: ElementRef;
  private elementID: string;
  private htmlContent: string;
  @Output() contentChanged: EventEmitter<any>;

  constructor(@Inject(ElementRef) elementRef: ElementRef)
  {
    this.elementRef = elementRef;

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    this.elementID = 'tinymce' + uniqid;
    this.contentChanged = new EventEmitter();
  }

  ngAfterViewInit()
  {
    //Clone base textarea
    var baseTextArea = this.elementRef.nativeElement.querySelector("#baseTextArea");
    // var clonedTextArea = baseTextArea.cloneNode(true);
    baseTextArea.id = this.elementID;

    var formGroup = this.elementRef.nativeElement.querySelector("#tinyFormGroup");
    formGroup.appendChild(baseTextArea);

    //Attach tinyMCE to cloned textarea
    tinymce.init(
      {
        mode: 'exact',
        height: 200,
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code'
        ],
        theme_advanced_resizing: true,
        theme_advanced_resizing_use_cookie : false,
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
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
    ed.on('keyup', this.tinyMCEOnKeyup.bind(this));
    ed.on('init',function(e:any ) {
      if (that.htmlContent != null){
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
