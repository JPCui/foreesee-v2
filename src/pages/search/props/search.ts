import Calendar from "../../components/calendar/props/calendar";

export interface CityInfo {
  province: string;
  city: string;
  district: string;
}

export interface SearchProps {
  onSelectCity: (cityInfo: CityInfo) => void;
}

export interface SearchState {
  keyword: string;
  items: {};
}
