//Calculator Script
// Garden Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Plant data
    const plantData = {
        tomatoes: { plantsPerSqM: 2, seedCost: 5.0, fertilizerPerPlant: 3.0 },
        lettuce: { plantsPerSqM: 16, seedCost: 1.0, fertilizerPerPlant: 1.0 },
        carrots: { plantsPerSqM: 25, seedCost: 1.0, fertilizerPerPlant: 1.0 },
        peppers: { plantsPerSqM: 1, seedCost: 6.0, fertilizerPerPlant: 4.0 },
        herbs: { plantsPerSqM: 9, seedCost: 3.0, fertilizerPerPlant: 1.0 },
        beans: { plantsPerSqM: 4, seedCost: 1.0, fertilizerPerPlant: 1.0 }
    };

    // Get form elements
    const lengthInput = document.getElementById('garden-length');
    const widthInput = document.getElementById('garden-width');
    const plantSelect = document.getElementById('plant-type');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');

    // Form validation rules
    const validationRules = {
        length: { required: true, type: 'number', min: 0.1, max: 1000 },
        width: { required: true, type: 'number', min: 0.1, max: 1000 },
        plantType: { required: true }
    };

    // Add event listeners
    calculateBtn.addEventListener('click', calculateGarden);
    resetBtn.addEventListener('click', resetCalculator);

    // Clear errors when user types
    lengthInput.addEventListener('input', () => clearFieldError(lengthInput));
    widthInput.addEventListener('input', () => clearFieldError(widthInput));
    plantSelect.addEventListener('change', () => clearFieldError(plantSelect));

    function validateForm() {
        let isValid = true;

        // Validate length
        const lengthErrors = validateInput(lengthInput, validationRules.length);
        if (lengthErrors.length > 0) {
            showFieldError(lengthInput, lengthErrors[0]);
            isValid = false;
        }

        // Validate width
        const widthErrors = validateInput(widthInput, validationRules.width);
        if (widthErrors.length > 0) {
            showFieldError(widthInput, widthErrors[0]);
            isValid = false;
        }

        // Validate plant type
        if (!plantSelect.value) {
            showFieldError(plantSelect, 'Please select a plant type');
            isValid = false;
        }

        return isValid;
    }

    function calculateGarden() {
        // Clear previous errors
        clearFieldError(lengthInput);
        clearFieldError(widthInput);
        clearFieldError(plantSelect);

        if (!validateForm()) {
            toast.show({
                title: "Invalid Input",
                description: "Please check your inputs and try again.",
                variant: "error"
            });
            return;
        }

        const length = Number(lengthInput.value);
        const width = Number(widthInput.value);
        const plantType = plantSelect.value;
        const area = length * width;
        const plantInfo = plantData[plantType];

        const totalPlants = Math.floor(area * plantInfo.plantsPerSqM);
        const seedCost = totalPlants * plantInfo.seedCost;
        const fertilizerCost = totalPlants * plantInfo.fertilizerPerPlant;
        const totalCost = seedCost + fertilizerCost;

        const results = {
            area: area.toFixed(1),
            totalPlants,
            seedCost: seedCost.toFixed(2),
            fertilizerCost: fertilizerCost.toFixed(2),
            totalCost: totalCost.toFixed(2),
            plantType: plantType.charAt(0).toUpperCase() + plantType.slice(1),
            plantsPerSqM: plantInfo.plantsPerSqM
        };

        displayResults(results);

        toast.show({
            title: "Calculation Complete!",
            description: `Your ${results.plantType.toLowerCase()} garden plan is ready.`,
            variant: "success"
        });
    }

    function displayResults(results) {
        // Hide no results message
        noResults.style.display = 'none';

        // Update area display
        document.getElementById('area-value').textContent = results.area;

        // Update plants display
        document.getElementById('plants-value').textContent = results.totalPlants;
        document.getElementById('plants-type').textContent = `${results.plantType} Plants`;

        // Update cost breakdown
        document.getElementById('seed-cost').textContent = `${results.seedCost}`;
        document.getElementById('fertilizer-cost').textContent = `${results.fertilizerCost}`;
        document.getElementById('total-cost').textContent = `${results.totalCost}`;

        // Update planting density info
        document.getElementById('density-info').innerHTML = `
            For ${results.plantType.toLowerCase()}, you can plant approximately 
            ${results.plantsPerSqM} plants per square meter.
        `;

        // Show results container
        resultsContainer.style.display = 'block';
    }

    function resetCalculator() {
        // Clear form
        lengthInput.value = '';
        widthInput.value = '';
        plantSelect.value = '';

        // Clear errors
        clearFieldError(lengthInput);
        clearFieldError(widthInput);
        clearFieldError(plantSelect);

        // Hide results and show no results message
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
    }
});