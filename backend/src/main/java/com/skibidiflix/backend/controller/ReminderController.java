package com.skibidiflix.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skibidiflix.backend.dto.ReminderRequest;
import com.skibidiflix.backend.dto.ReminderResponse;
import com.skibidiflix.backend.service.ReminderService;

@RestController
@RequestMapping("/reminders")
@CrossOrigin(origins = "http://localhost:4200")
public class ReminderController {
    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @PostMapping
    public ReminderResponse createReminder(@RequestBody ReminderRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return new ReminderResponse(false, "Email do usuario logado nao encontrado.");
        }

        if (request.getReminderDate() == null || request.getReminderDate().isBlank()) {
            return new ReminderResponse(false, "Selecione a data do lembrete.");
        }

        boolean sent = reminderService.sendReminder(request);

        if (!sent) {
            return new ReminderResponse(false, "Configure o envio de email do servidor para enviar o lembrete.");
        }

        return new ReminderResponse(true, "Lembrete enviado para " + request.getEmail() + ".");
    }
}
