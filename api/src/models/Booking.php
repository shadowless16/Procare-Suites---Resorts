<?php

class Booking {
    public $id;
    public $guest_name;
    public $guest_email;
    public $check_in;
    public $check_out;
    public $room_type;
    public $guests;
    public $special_requests;
    public $created_at;

    public function __construct($data) {
        $this->id = $data['id'] ?? null;
        $this->guest_name = $data['guest_name'] ?? '';
        $this->guest_email = $data['guest_email'] ?? '';
        $this->check_in = $data['check_in'] ?? '';
        $this->check_out = $data['check_out'] ?? '';
        $this->room_type = $data['room_type'] ?? '';
        $this->guests = $data['guests'] ?? 1;
        $this->special_requests = $data['special_requests'] ?? '';
        $this->created_at = $data['created_at'] ?? null;
    }
}