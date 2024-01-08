import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Badge({ number, price }) {
  let color;
  let bgcolor;
  let icon;
  let formatedNumber;

  number > 0 ? (color = "#027A48") : (color = "#B42318");
  number > 0 ? (bgcolor = "#ECFDF3") : (bgcolor = "#FEF3F2");
  number > 0 ? (bgcolor = "#ECFDF3") : (bgcolor = "#FEF3F2");
  number > 0
    ? (formatedNumber = "+ " + Math.abs(number))
    : (formatedNumber = "- " + Math.abs(number));
  number > 0
    ? (icon = <KeyboardArrowUpIcon style={{ height: "22px" }} />)
    : (icon = <KeyboardArrowDownIcon style={{ height: "22px" }} />);

  if (price) {
    formatedNumber =
      "$ " +
      formatedNumber +
      " ( " +
      formatedNumber[0] +
      getRandomValueForPrice() +
      "% )";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        backgroundColor: bgcolor,
        borderRadius: "50px",
        fontWeight: "600",
        paddingRight: "10%",
      }}
    >
      {icon}
      {formatedNumber}
    </div>
  );
}

export default Badge;

function getRandomValueForPrice() {
  return Math.trunc(Math.random() * 100) / 100;
}
