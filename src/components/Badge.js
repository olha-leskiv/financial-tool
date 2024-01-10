import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Badge({ number, price }) {
  let color;
  let bgcolor;
  let icon;
  let formatedNumber;

  number > 0 ? (color = "#008D95") : (color = "#FA4D5E");
  number > 0 ? (bgcolor = "#DFFDFF") : (bgcolor = "#FFF1F3");
  number > 0
    ? (formatedNumber = "+ " + Math.abs(number))
    : (formatedNumber = "- " + Math.abs(number));
  number > 0
    ? (icon = (
        <KeyboardArrowUpIcon style={{ height: "20px", marginBottom: "2px" }} />
      ))
    : (icon = (
        <KeyboardArrowDownIcon
          style={{ height: "20px", marginBottom: "2px" }}
        />
      ));

  let value = Math.abs(number);
  if (price) {
    formatedNumber =
      "$ " +
      value +
      " ( " +
      formatedNumber[0] +
      getRandomValueForPrice() +
      "% )";
  }

  return (
    <div style={{}}>
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
          fontSize: "13px",
          padding: "2px 10px 0 4px",
        }}
      >
        {icon}
        <div style={{ flexGrow: "1", textAlign: "right" }}>
          {formatedNumber}
        </div>
      </div>
    </div>
  );
}

export default Badge;

function getRandomValueForPrice() {
  return Math.trunc(Math.random() * 100) / 100;
}
