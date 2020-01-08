export interface IFlight {
  id: string;
  created_at: Date;
  updated_at: Date;
  flight_identifier: string;
  flt_num: number;
  scheduled_origin_gate?: string;
  scheduled_destination_gate?: string;
  out_gmt: Date;
  in_gmt: Date;
  off_gmt: Date;
  on_gmt: Date;
  destination: string;
  origin: string;
  destination_full_name?: string;
  origin_full_name?: string;
}

export interface IStation {
  name: string;
}
