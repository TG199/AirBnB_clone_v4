$(document).ready(function() {
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
});
