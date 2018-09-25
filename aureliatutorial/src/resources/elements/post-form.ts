import { I18N } from 'aurelia-i18n';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { PostService } from './../../common/services/post-service';
import {bindable, autoinject} from 'aurelia-framework';
import { Post } from '../../common/services/models';
import {ValidationRules, ValidationControllerFactory, ValidationController, validationMessages } from 'aurelia-validation';

@autoinject
export class PostForm {
  @bindable post;
  @bindable title;
  alltags: string[];
  newTag: any;
  controller:ValidationController;
  localeSubscription: Subscription;

  constructor(
    private postService: PostService, 
    private factory: ValidationControllerFactory, 
    private ea: EventAggregator,
    private i18n: I18N){
    this.controller = factory.createForCurrentScope();

   
  }

  attached () {
    //this.post = new Post("","","","",[],null);
    this.postService.allTags().then(data=> {
      this.alltags = data.tags;
    }).catch(error=> { 
      this.ea.publish('toast', {type:'error', msg: error.message})
    })

    this.localeSubscription = this.ea.subscribe('locale-changed', updatedAt=> 
    {
      this.setValidation();
    })
  }

  addTag(){
    this.alltags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag ='';
  }

  postChanged(newValue, oldValue) {
    this.setValidation();
  }

  setValidation(){
    if (this.post) { 
      validationMessages['required'] = this.i18n.tr('post-form:required-field');
      ValidationRules
        .ensure('title').displayName(this.i18n.tr('post-form:title')).required().minLength(5)
        .ensure('body').displayName(this.i18n.tr('post-form:body')).required()
        .on(this.post);
      this.controller.validate();
    }
  }

  submit() {
    
  }

  dettached() {
    this.localeSubscription.dispose();
  }

 
}

