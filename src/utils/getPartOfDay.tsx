import CustomImages from "../assets/customImages";

export const getPartOfDay = (): { greeting: string; image: any } => {
    const hour = new Date().getHours();
  
    if (hour >= 5 && hour < 12) {
      return { greeting: "Good morning,", image: CustomImages.morningIcon };
    } else if (hour >= 12 && hour < 17) {
      return { greeting: "Good afternoon,", image: CustomImages.afternoonIcon };
    } else if (hour >= 17 && hour < 21) {
      return { greeting: "Good evening,", image: CustomImages.eveningIcon };
    } else {
      return { greeting: "Good night,", image: CustomImages.nightIcon };
    }
  };
  