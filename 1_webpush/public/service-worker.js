self.addEventListener('push', function(event) {

    const options = {
        body: event.data.text(),
        icon: 'icon.jpg',
    };

    event.waitUntil(
        self.registration.showNotification('TEST', options)
        
    );
});
  