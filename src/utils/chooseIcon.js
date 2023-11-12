function chooseIcon(marker) {
  switch (marker.type?.name) {
    case "CATERING":
      return {
        url: require("../images/catering.ico"),
      };
    case "INFRASTRUCTURE":
      return {
        url: require("../images/infrastructure.ico"),
      };
    case "SHOP":
      return {
        url: require("../images/shop.ico"),
      };
    case "PARK":
      return {
        url: require("../images/park.ico"),
      };
    case "BUILDING":
      return {
        url: require("../images/building.ico"),
      };
    case "EDUCATION":
      return {
        url: require("../images/education.ico"),
      };
    case "FACILITY":
      return {
        url: require("../images/facility.ico"),
      };
    case "MEDICINE":
      return {
        url: require("../images/medicine.ico"),
      };
    case "TRANSPORT":
      return {
        url: require("../images/transport.ico"),
      };
    case "PLAYGROUND":
      return {
        url: require("../images/playground.ico"),
      };
    default:
      return {
        url: require("../images/playground.ico"),
      };
  }
}

export default chooseIcon;
