package com.skibidiflix.backend.service;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.skibidiflix.backend.dto.ReminderRequest;

@Service
public class ReminderService {
    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    public ReminderService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public boolean sendReminder(ReminderRequest request) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();

        if (mailSender == null) {
            return false;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());
        message.setSubject("Lembrete de filme: " + request.getMovieName());
        message.setText(
            "Voce pediu para receber um lembrete sobre o filme "
                + request.getMovieName()
                + " em "
                + request.getReminderDate()
                + ".\n\nAcesse: "
                + request.getMovieUrl()
        );

        try {
            mailSender.send(message);
            return true;
        } catch (MailException ex) {
            return false;
        }
    }
}
