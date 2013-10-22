define([
	"collections/snippets"
  ,"views/my-form"
	,"helper/rest"
	,"helper/idHelper"
	,"views/submitDiv"
], function(
	SnippetsCollection
	,MyFormView
	,restHelper
	,idHelper
	,SubmitButtonDiv
){
  return {
    initialize: function(){
			this.getInstance();
    },

		getInstance: function() {
			var that = this;
			restHelper.searchInstance(idHelper.getInstanceId(), function(instance) {
				that.getFormById(instance.form)
			});
		},

		getFormById: function(formId) {
			var that = this;
			restHelper.searchForm(formId,function(form) {
				that.initDisplay(form);
			});
		},

		initDisplay: function(form) {
			var snippetCollection = new SnippetsCollection();
			var formView = new MyFormView({
        title: "Original"
        , collection: snippetCollection
      });

			//add the logic for the submit button
			new SubmitButtonDiv({
				el: $('#submitDiv')
				, collection: snippetCollection
			});

			formView.loadForm(form.model);
			$('#nameH2').text(form.name);
			$('#descH4').text(form.description);
		}

  }
});
