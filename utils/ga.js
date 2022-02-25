export const GA_ID = "G-Z1WSJRTW2F";

// event_name = "selected_blog", "selected_podcast", "chip_in"
// event_category = "podcasts", "blogs", "trollboard", "revenue"
// event_label = "podc_from_podc_index", "more_content_podc"

export const fireEvent = (
  evtName,
  evtData = { event_category: "", event_label: "" }
) => {
  if (process.browser) {
    const token = localStorage.getItem("funk-27");
    const IS_PROD = process.env.NODE_ENV !== "development";
    const IS_ADMIN = token === "981235iubjerg92h34t9-289035b-209834bht";
    if (IS_ADMIN) {
      return console.log("GA4 | admin token | NO EVENTS BEING SENT");
    }
    if (!IS_PROD) {
      return console.log("GA4 | development env | NO EVENTS BEING SENT");
    }
    if (IS_PROD && !IS_ADMIN) {
      // @ts-ignore
      window.gtag("event", evtName, {
        ...evtData,
      });
    }
  }
};
