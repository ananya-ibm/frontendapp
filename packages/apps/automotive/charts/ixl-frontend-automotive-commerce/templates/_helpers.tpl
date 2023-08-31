{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "ixl-frontend-automotive-commerce.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "ixl-frontend-automotive-commerce.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "ixl-frontend-automotive-commerce.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "ixl-frontend-automotive-commerce.labels" -}}
helm.sh/chart: {{ include "ixl-frontend-automotive-commerce.chart" . }}
{{ include "ixl-frontend-automotive-commerce.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app: {{ include "ixl-frontend-automotive-commerce.name" . }}
version: {{ .Values.version }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "ixl-frontend-automotive-commerce.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ixl-frontend-automotive-commerce.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app: {{ include "ixl-frontend-automotive-commerce.name" . }}
version: {{ .Values.version }}
{{- end -}}

{{/*
Service labels
*/}}
{{- define "ixl-frontend-automotive-commerce.serviceLabels" -}}
app: {{ include "ixl-frontend-automotive-commerce.name" . }}
service: {{ include "ixl-frontend-automotive-commerce.name" . }}
{{- end -}}

{{/*
Deployment annotations
*/}}
{{- define "ixl-frontend-automotive-commerce.deploymentAnnotations" -}}
sidecar.istio.io/inject: {{ .Values.annotations.sidecarInject | quote }}
{{- end -}}