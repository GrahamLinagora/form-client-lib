define([
	"jquery","helper/serverConf"
], function(
  $,serverConf
){
  return {

		searchInstance: function(id, searchSuccess) {
			$.ajax({
				type: "GET",
				url: serverConf.getServerRootUrl()+"/instances/"+id,
				dataType: "json",
				success: function (data)
				{
					searchSuccess(data);
				}
			});
		},

		searchForm: function(id, searchSuccess) {
			$.ajax({
				type: "GET",
				url: serverConf.getServerRootUrl()+"/forms/"+id,
				dataType: "json",
				success: function (data)
				{
					searchSuccess(data);
				}
			});
		},

		createResult: function(resultModel, instanceId,creationCallback) {
			var result = {
				'instance' : instanceId,
				'model' : resultModel
			};

			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/results",
				dataType: "json",
				data: result,
				success: function (data)
				{
					creationCallback(data);
				}
			});
		}

	};
});
