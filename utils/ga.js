export const GA_ID = "G-Z1WSJRTW2F";

// event_name = "selected_blog", "selected_podcast"
// event_category = "podcasts", "blogs", "trollboard"
// event_label = "podc_from_podc_index", "more_content_podc"
export const fireEvent = (
  evtName,
  evtData = { event_category: "", event_label: "" }
) => {
  if (process.browser) {
    // @ts-ignore
    window.gtag("event", evtName, {
      ...evtData,
    });
  }
};
