define([
  "jquery", "underscore", "backbone", "helper/rest", "helper/idHelper"
], function(
  $, _, Backbone,restHelper,idHelper
){
  return Backbone.View.extend({
    tagName: "div",

		events: {
			//Button click event
			"click .submit": "handleSubmit"
		},

		handleSubmit: function() {
			var resultModel = this.buildResultModel();

			restHelper.createResult(resultModel, idHelper.getInstanceId(), function() {
				//TODO change this : this message is only here for a demo
				window.alert("Your input has been stored properly.");
			});
		},

		buildResultModel: function() {
			var resultModel = new Object();
	
			var fieldTitles = this.collection.map(function(snippet) {
				return snippet.get("title");
			});
			fieldTitles.shift(); //remove the first field : the title of the form

			var labels = $('#build .component').find("label");

			var labelIndex = 0;
			for(var i=0; i<fieldTitles.length; i++) {
				var fieldModel = new Object();
				fieldModel.title = fieldTitles[i];

				var fieldId = labels[labelIndex].getAttribute('for');
				var fieldValue = this.getSingleFieldValue($('#build .component #'+fieldId));

				if(fieldValue === undefined ) {//the field referenced by the label is multiple field : radio or checkbox
					//get all the next fields whose type is radio or checkbox
					var labelI = labelIndex+1;
					var stillInMultipleField;
					var aggregatedValue = '';
					do {
						fieldId = labels[labelI].getAttribute('for');
						var newValue = this.getMultipleFieldValue($('#build .component #'+fieldId));
						if(newValue !=undefined) {aggregatedValue = aggregatedValue + newValue;}
						labelI++;
						stillInMultipleField = this.isRadioOrCheckBox($('#build .component #'+fieldId));
					}
					while(stillInMultipleField);

					fieldModel.value = aggregatedValue;
					labelIndex = labelI-1;
				}
				else {//if th field referenced by the label is a single field : input, select...
					fieldModel.value = fieldValue;
					labelIndex++;
				}

				resultModel['field'+i] = fieldModel;
			}
		
			//TODO remove trace
			console.log('Result   :  '+JSON.stringify(resultModel));

			return resultModel;
		},

		getSingleFieldValue: function(field) {
			return field.val();
		},

		isRadioOrCheckBox: function(field) {
			var type = field.attr('type');
			return type=='radio' || type=='checkbox';
		},

		//return the value of a checkbox or radio if it is selected
		getMultipleFieldValue: function(field) {
			if(this.isRadioOrCheckBoxChecked(field)) {
				return field.val();
			}
			else {
				return '';
			}
		},

		isRadioOrCheckBoxChecked: function(field) {
			return field.is(':checked');
		}

  });
});
