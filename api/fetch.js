export default async function handler(req, res) {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    const html = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "sec-ch-ua":
          `"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": `"Windows"`,
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://www.facebook.com/",
        "Connection": "keep-alive"
        "Cookie":"cookie_accept_v2=%7B%22e%22%3A1%2C%22f%22%3A1%2C%22t%22%3A1%2C%22a%22%3A1%7D; parental-control=yes; moments_ad_offset=3; dyltv-shown-counter=3; moments_listing_ad_offset=12; ff_thumb_offset=15; h_v4_gay=%7B%22v%22%3A%5B%5D%2C%22l%22%3A%5B%5D%2C%22f%22%3A%5B%5D%2C%22pv%22%3A%5B26357975%2C25775783%2C27839454%2C27297968%2C27641671%2C26944396%2C20946527%2C22547808%2C26153328%2C27625923%2C18191952%2C27792998%2C16301559%2C21000011%2C28204826%2C10748703%2C22068458%2C10766615%2C14808339%2C9380153%5D%7D; moments_offset=83; search_last_list=%5B%22suck%22%2C%22petite%20trap%20fucked%22%2C%22small%20dick%20sissy%22%2C%22hung%20asian%22%2C%22blacks%20love%20twinks%22%2C%22black%20chubby%22%2C%22japanese%20chubby%22%2C%22thai%20aunty%20pee%22%2C%22thai%20aunty%22%2C%22transgender%20midget%22%5D; h_v4_shemale=%7B%22v%22%3A%5B12530555%2C20948926%2C18604032%2C24041822%2C26478929%2C24154201%2C25023001%2C27875045%2C28070269%2C25739251%5D%2C%22l%22%3A%5B%5D%2C%22f%22%3A%5B%5D%2C%22pv%22%3A%5B12530555%2C13375196%2C25641556%2C20948926%2C20870698%2C20328445%2C21548923%2C18788934%2C20648662%2C15577797%2C12575805%2C21283997%2C11857155%2C18339983%2C12390826%2C12004226%2C12109575%2C20593122%2C17014975%2C24864327%5D%7D; x_content_preference_index=straight; x_viewes=%5B10934039%2C26115222%2C5194153%2C18424995%2C21243123%2C23479711%2C15937039%2C21011849%2C26456884%2C19002337%2C23483662%2C12530555%2C9944894%2C15443826%2C13375196%2C18604032%2C26346864%2C23746628%2C26565543%2C25679930%5D; stats_src_last=xhamsterlive.com; settings=eyJpc1dlYnBTdXBwb3J0ZWQiOnRydWUsImlzV2VibVN1cHBvcnRlZCI6dHJ1ZSwiZXh0RGV0ZWN0ZWRWMiI6ZmFsc2UsIm1vbWVudHNJc0hpZGRlbiI6bnVsbCwiaXNTaWRlYmFySGlkZGVuIjpudWxsLCJleHBpcmVzIjp7ImV4dERldGVjdGVkVjIiOjE3Njg5NzkyNDJ9LCJ0c1Nwb3RDb3VudGVycyI6W3sic3BvdCI6Im1hc3Rlcl9tb2JpbGVfbWlkZGxlIiwidGltZSI6MTc2OTI1MjAzNCwiY291bnQiOjZ9LHsic3BvdCI6Im1hc3Rlcl9tb2JpbGVfZm9vdGVyIiwidGltZSI6MTc2OTI1MjAzNCwiY291bnQiOjZ9LHsic3BvdCI6Im1hc3Rlcl9tb2JpbGVfaGVhZGVyIiwidGltZSI6MTc2OTI1MjAzNCwiY291bnQiOjZ9XX0%3D; X-CSRF-TOKEN=NMTTBWd_Gwg4KqivZEFsJteMQI4psVi3; h_v4_straight=%7B%22v%22%3A%5B23746628%2C25679930%2C26565543%2C26346864%2C16561214%2C9693474%2C26975192%2C13799559%2C20823456%2C26399476%2C4896288%2C3488601%2C12469700%2C21650262%2C14373211%2C25227615%2C26818446%2C14252085%2C23745403%2C26601988%5D%2C%22l%22%3A%5B26399476%5D%2C%22f%22%3A%5B%5D%2C%22pv%22%3A%5B26565543%2C23746628%2C25679930%2C26346864%2C24037871%2C25327837%2C27794073%2C23546141%2C10890075%2C22349524%2C28572678%2C14899728%2C28238611%2C26811697%2C26573305%2C27846330%2C28561679%2C22154819%2C27969580%2C25963419%5D%7D; g_state={"i_l":0,"i_ll":1769267336107,"i_b":"r8Y2ECwONnNO1emb1jScJTzWOO3o02qBjnR/FsYSrfo","i_e":{"enable_itp_optimization":0}}; redirect_login_url=https%3A%2F%2Fxhamster.com%2Fvideos%2Fmature-big-boob-milf-showing-her-naked-sexy-body-to-her-lover-in-the-bathroom-and-dirty-talk-xhx9qUw; x_tgt=%7B%22cams%22%3A%2224-01-2026%22%2C%22login%22%3A%2224-01-2026%22%7D; UID=299877271;"
        
        // Optional cookies
        // "Cookie": "sb=xxx; datr=xxx;"
      }
    }).then(r => r.text());

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");

    res.status(200).send(html);

  } catch (e) {
    res.status(500).json({
      error: "Fetch failed",
      message: e.message
    });
  }
}
