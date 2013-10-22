define([], function(){
  return {
		getInstanceId: function() {
			//get instance id from the url
			//TODO improve this : it is not a very clean way to do this : maybe use a generated json file 
			var pathArray = window.location.pathname.split('/');
			if(pathArray[pathArray.length-1] === '' ) {
				//check if the url ends with a '/'
				return pathArray[pathArray.length-2];
			}
			else {
				return pathArray[pathArray.length-1];
			}
		}
  }
});
