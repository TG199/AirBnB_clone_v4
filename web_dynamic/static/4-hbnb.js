$(document).ready(function() {
    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === "OK") {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Amenity filter logic
    let selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        let amenitiesList = Object.values(selectedAmenities).join(', ');
        if (amenitiesList.length === 0) {
            amenitiesList = '&nbsp;';
        }

        $('.amenities h4').html(amenitiesList);
    });

    // Fetch places from the API
    function fetchPlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function(data) {
                $('.places').empty();
                for (let place of data) {
                    $('.places').append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`
                    );
                }
            }
        });
    }

    // Initial load of places
    fetchPlaces();

    // Load places when the search button is clicked
    $('button').click(function() {
        fetchPlaces();
    });
});
