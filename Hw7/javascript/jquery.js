$(document).ready(function () {

  $('#minColSlider').slider({
    min: -150,
    max: 150,
    slide: function(event, ui){
      console.log("hhii")
      $("#minXValue").val(parseInt(ui.value));
      makeForm();
    }
  });

  $.validator.addMethod('lessThanMin', function(value, element, param) {
    return this.optional(element) || value >= $(param).val();
  } , "Maximum value can't be less than the minimum value.");


  $("form").validate({
    rules: {
      "minXValue": {
      required: true,
      range: [-150, 150],
      digits: true,number:true
      },
      "maxXValue": {
        required: true,
        range: [-150, 150],
        lessThanMin: "#minXValue"
      },
      "minYValue": {
        required: true,
        range: [-150, 150]
      },
      "maxYValue": {
        required: true,
        range: [-150, 150],
        lessThanMin: "#minYValue"
      }
    },
    messages: {
      minXValue: {
        required: "Please enter a minimum column value. Must be an integer.",
        range: "Number must be between -150 to 150."
      },
      maxXValue: {
        required: "Please enter a minimum column value. Must be an integer.",
        range: "Number must be between -150 to 150."
      },
      minYValue: {
        required: "Please enter a minimum row value. Must be an integer.",
        range: "Number must be between -150 to 150."
      },
      maxYValue: {
        required: "Please enter a minimum row value. Must be an integer.",
        range: "Number must be between -150 to 150."
      },
    },
  });
  
  $("form").submit(function(e) {
    e.preventDefault();
    makeForm();
  });
});