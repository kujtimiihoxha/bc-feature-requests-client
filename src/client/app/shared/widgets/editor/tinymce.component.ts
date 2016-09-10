/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, ElementRef, Inject, Output, EventEmitter, Input, AfterViewInit, OnDestroy} from '@angular/core';
declare const tinymce:any;
/**
 * TinyEditorComponent.
 * This component allows us to use the tinymce editor
 *  for the description of the feature request.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
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
  /**
   * Content changed event.
   * @type {EventEmitter}
   */
  @Output() contentChanged: EventEmitter<any> = new EventEmitter();
  /**
   * The current element reference.
   */
  elementRef: ElementRef;

  /**
   * Editor id.
   */
  elementID: string;

  /**
   * Editor content.
   */
  htmlContent: string;

  /**
   * Injects the elementref.
   * @param elementRef used to initialize the editor.
   */
  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    this.elementID = 'tinymce' + uniqid;
  }

  /**
   * Initializes the editor.
   */
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

  /**
   * Removes the editor.
   */
  ngOnDestroy() {
    //destroy cloned elements
    tinymce.get(this.elementID).remove();

  }

  /**
   * Subscribe to events.
   * @param ed the editor.
   */
  tinyMCESetup(ed:any ) {
    let that = this;
    ed.on('change', this.tinyMCEOnChange.bind(this));
    ed.on('init',function(e:any ) {
      if(typeof that.htmlContent !== 'undefined') {
        //noinspection TypeScriptUnresolvedFunction
        e.target.setContent(that.htmlContent);
      }
    });
  }

  /**
   * Content change handler.
   */
  tinyMCEOnChange() {
    //noinspection TypeScriptUnresolvedFunction
    this.contentChanged.emit(tinymce.get(this.elementID).getContent());
  }

  /**
   * Sets the initial value of the editor content.
   * @param content
   */
  @Input()
  set mceContent(content:any) {
    this.htmlContent = content;
  }
}
