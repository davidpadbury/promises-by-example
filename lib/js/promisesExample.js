(function($) {
    var currentSlide;

    /**
     * Create global functions for examples
     */
    function waitForPromise(promiseName) {
        var promisesEl = currentSlide.find('.promises'),
            promiseEl = generateVisualElement(promiseName),
            deferred = Q.defer();

        promiseEl.find('button.resolve').click(function() {
            deferred.resolve('Resolved ' + promiseName);
        });
        promiseEl.find('button.reject').click(function() {
            deferred.reject('Rejected ' + promiseName);
        });

        promiseEl.hide().appendTo(promisesEl).show('slow');

        return deferred.promise;
    }

    function alertArg(title) {
        return function(arg) {
            alert(title + ': ' + arg);
        };
    }

    function generateVisualElement(promiseName) {
        return $('<div class=promise>')
            .append($('<span class=title>').text(promiseName))
            .append('<button class=resolve>Resolve</button>')
            .append('<button class=reject>Reject</button>');
    }

    Reveal.addEventListener('slidechanged', function(e) {
        currentSlide = $(e.currentSlide);

        if (currentSlide.is('[data-promise-example]')) {
            var code = currentSlide.find('code').text();

            try {
                eval(code);
            } catch (e) {
                console.log('Error evaluating example code', e);
            }
        }
    });
})(window.jQuery);
