import { object, string, email, optional, pipe, minLength, maxLength } from 'valibot';

export const userFormSchema = object({
    username: pipe(string(), minLength(2), maxLength(50)),
    email: pipe(string(), email()),
});

export const groupFormSchema = object({
    groupName: pipe(string(), minLength(2)),
    groupDescription: pipe(optional(string(), 'Example group description'), maxLength(200))
});