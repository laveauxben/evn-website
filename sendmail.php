<?php
// Einfaches PHP-Mail-Skript (Beispiel). Auf Produktionsservern bitte CSRF/Spam-Filter und Validierung ergänzen.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}
$name = strip_tags($_POST['name'] ?? 'n/A');
$email = strip_tags($_POST['email'] ?? 'noreply@example.com');
$phone = strip_tags($_POST['phone'] ?? '');
$message = strip_tags($_POST['message'] ?? '');
$userSubject = strip_tags($_POST['subject'] ?? '');

$to = 'info@ev-n.de'; // Zieladresse
$subject = "Web-Anfrage von $name";
$body = "Name: $name\nE-Mail: $email\nTelefon: $phone\n\nNachricht:\n$message\n";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Fehler beim Senden';
}
?>