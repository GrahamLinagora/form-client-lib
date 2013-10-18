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

		createResult: function(resultModel, creationCallback) {
			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/results",
				dataType: "json",
				data: instance,
				success: function (data)
				{
					creationCallback(data);
				}
			});
		}

	};
});
